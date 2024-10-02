@extends('layouts.admin')

@section('content')
    <div class="container">
        <h1>Editar Item</h1>

        @if($errors->any())
            <div class="alert alert-danger">
                <ul>
                    @foreach($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <form action="{{ route('items.update', $item->id) }}" method="POST">
            @csrf
            @method('PUT')

            <div class="form-group">
                <label for="name">Nombre</label>
                <input type="text" class="form-control" id="name" 
                name="name" value="{{ old('name', $item->name) }}" required>
            </div>
            <div class="form-group">
                <label for="description">Descripcion</label>
                <input type="text" class="form-control" id="description" 
                name="description" value="{{ old('description', $item,->description) }}" required>
            </div>
            <div class="form-group">
                <label for="price">Precio</label>
                <input type="text" class="form-control" id="price" 
                name="price" value="{{ old('price'), $item->price }}" required>
            </div>
            <button type="submit" class="btn btn-primary">Actualizar</button>
            <a href="{{ route('items.index') }}" class="btn btn-secondary">Cancelar</a>
        </form>
    </div>
@endsection